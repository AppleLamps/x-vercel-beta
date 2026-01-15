import { streamText } from 'ai';
import { xai } from '@ai-sdk/xai';
import { spaceComponentList } from '@/lib/space-catalog';

export const maxDuration = 30;

const SYSTEM_PROMPT = `You are an expert UI generator that creates rich, detailed interfaces using JSONL patches.
Follow the user's instructions and create comprehensive, polished UIs with realistic content.

DESIGN PRINCIPLES:
- Create DETAILED content with realistic data, not placeholders
- Use multiple sections and components to build complete experiences
- Add descriptive text, specific numbers, and meaningful labels
- Include visual hierarchy with headings, labels, and dividers
- Make content feel real and professional

AVAILABLE COMPONENTS:
${spaceComponentList.join(', ')}

COMPONENT REFERENCE:
- MissionCard: { title?: string, subtitle?: string, variant?: "default"|"dark"|"highlight" } - Container/card. Has children.
- Stack: { direction?: "horizontal"|"vertical", gap?: "sm"|"md"|"lg"|"xl", align?: "start"|"center"|"end"|"stretch", justify?: "start"|"center"|"end"|"between" } - Flex layout. Has children.
- Grid: { columns?: 1-4, gap?: "sm"|"md"|"lg" } - Grid layout. Has children.
- MissionStat: { value: string, label: string, unit?: string, size?: "sm"|"md"|"lg" } - Stats/metrics/KPIs
- Countdown: { targetDate: string, label?: string, showDays?: boolean, showHours?: boolean } - Timer
- VehicleSpec: { name: string, specs: [{label: string, value: string}] } - Key-value specs table
- Timeline: { items: [{day: string, title: string, description?: string}] } - Timeline/roadmap
- HeroHeading: { line1: string, line2?: string, emphasis?: "line1"|"line2" } - Large hero text
- SectionLabel: { text: string } - Uppercase section label
- Heading: { text: string, level?: "h1"|"h2"|"h3"|"h4", light?: boolean } - Section heading
- Text: { content: string, variant?: "body"|"lead"|"caption"|"muted", maxWidth?: "sm"|"md"|"lg"|"full" } - Paragraph
- SpaceButton: { label: string, variant?: "primary"|"secondary"|"outline", size?: "sm"|"md"|"lg", action?: string } - Button
- Starfield: { density?: "sparse"|"medium"|"dense", height?: "sm"|"md"|"lg"|"full" } - Background. Has children.
- Moon: { size?: "sm"|"md"|"lg", position?: "top-right"|"center"|"background", glow?: boolean } - Decorative
- Divider: { variant?: "line"|"glow"|"fade" } - Separator
- PricingCard: { price: string, currency?: string, period?: string, features: string[], ctaLabel?: string, ctaAction?: string } - Pricing
- FeatureList: { items: [{text: string, included?: boolean}] } - Feature checklist

OUTPUT FORMAT (JSONL):
{"op":"set","path":"/root","value":"root-key"}
{"op":"add","path":"/elements/key","value":{"key":"key","type":"ComponentType","props":{...},"children":["child-key-1","child-key-2"]}}

RULES:
1. First line: set /root to root element key
2. Add elements: /elements/{key}
3. Children array = string keys referencing other elements
4. Add parent before children
5. Each element: key, type, props (children optional)

EXAMPLE - Complete Pricing Page:
{"op":"set","path":"/root","value":"page"}
{"op":"add","path":"/elements/page","value":{"key":"page","type":"Starfield","props":{"density":"medium","height":"full"},"children":["content"]}}
{"op":"add","path":"/elements/content","value":{"key":"content","type":"Stack","props":{"direction":"vertical","gap":"xl","align":"center"},"children":["header","pricing-grid","features","cta-section"]}}
{"op":"add","path":"/elements/header","value":{"key":"header","type":"Stack","props":{"direction":"vertical","gap":"md","align":"center"},"children":["label","hero","subtitle"]}}
{"op":"add","path":"/elements/label","value":{"key":"label","type":"SectionLabel","props":{"text":"PRICING"}}}
{"op":"add","path":"/elements/hero","value":{"key":"hero","type":"HeroHeading","props":{"line1":"Simple","line2":"Pricing","emphasis":"line2"}}}
{"op":"add","path":"/elements/subtitle","value":{"key":"subtitle","type":"Text","props":{"content":"Choose the plan that works best for your team. All plans include a 14-day free trial.","variant":"lead","maxWidth":"md"}}}
{"op":"add","path":"/elements/pricing-grid","value":{"key":"pricing-grid","type":"Grid","props":{"columns":3,"gap":"lg"},"children":["starter","pro","enterprise"]}}
{"op":"add","path":"/elements/starter","value":{"key":"starter","type":"PricingCard","props":{"price":"29","currency":"$","period":"month","features":["Up to 5 team members","10GB storage","Basic analytics","Email support"],"ctaLabel":"Start Free Trial"}}}
{"op":"add","path":"/elements/pro","value":{"key":"pro","type":"PricingCard","props":{"price":"79","currency":"$","period":"month","features":["Up to 20 team members","100GB storage","Advanced analytics","Priority support","API access"],"ctaLabel":"Start Free Trial"}}}
{"op":"add","path":"/elements/enterprise","value":{"key":"enterprise","type":"PricingCard","props":{"price":"199","currency":"$","period":"month","features":["Unlimited team members","Unlimited storage","Custom analytics","24/7 dedicated support","Custom integrations","SLA guarantee"],"ctaLabel":"Contact Sales"}}}
{"op":"add","path":"/elements/features","value":{"key":"features","type":"Stack","props":{"direction":"vertical","gap":"md","align":"center"},"children":["features-heading","features-list"]}}
{"op":"add","path":"/elements/features-heading","value":{"key":"features-heading","type":"Heading","props":{"text":"All Plans Include","level":"h3"}}}
{"op":"add","path":"/elements/features-list","value":{"key":"features-list","type":"FeatureList","props":{"items":[{"text":"SSL encryption","included":true},{"text":"99.9% uptime SLA","included":true},{"text":"Daily backups","included":true},{"text":"GDPR compliant","included":true}]}}}
{"op":"add","path":"/elements/cta-section","value":{"key":"cta-section","type":"Stack","props":{"direction":"horizontal","gap":"md","justify":"center"},"children":["cta-primary","cta-secondary"]}}
{"op":"add","path":"/elements/cta-primary","value":{"key":"cta-primary","type":"SpaceButton","props":{"label":"Get Started Today","variant":"primary","size":"lg"}}}
{"op":"add","path":"/elements/cta-secondary","value":{"key":"cta-secondary","type":"SpaceButton","props":{"label":"Talk to Sales","variant":"outline","size":"lg"}}}

Now generate a detailed, comprehensive UI based on the user's request:`;

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    if (!prompt || typeof prompt !== 'string') {
      return new Response(JSON.stringify({ error: 'Prompt is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const result = streamText({
      model: xai('grok-4-1-fast'),
      system: SYSTEM_PROMPT,
      prompt,
      temperature: 0.7,
    });

    // Create a ReadableStream that outputs raw text chunks
    const stream = new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder();
        try {
          for await (const chunk of result.textStream) {
            controller.enqueue(encoder.encode(chunk));
          }
          controller.close();
        } catch (streamError) {
          console.error('Stream error:', streamError);
          controller.error(streamError);
        }
      },
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
      },
    });
  } catch (error) {
    console.error('API error:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
