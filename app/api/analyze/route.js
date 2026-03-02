export async function POST(req) {
  try {
    const { symptoms } = await req.json();
    const s = symptoms.toLowerCase();

    let deficiency = "General nutritional imbalance";

    if (s.includes("fatigue") || s.includes("tired")) {
      deficiency = "Iron or Vitamin B12 deficiency";
    } else if (s.includes("muscle cramps")) {
      deficiency = "Magnesium deficiency";
    } else if (s.includes("hair fall")) {
      deficiency = "Iron or Biotin deficiency";
    } else if (s.includes("weak immunity")) {
      deficiency = "Vitamin D or Zinc deficiency";
    } else if (s.includes("bone pain")) {
      deficiency = "Vitamin D deficiency";
    } else if (s.includes("pale skin")) {
      deficiency = "Iron deficiency";
    } else if (s.includes("tingling") || s.includes("numbness")) {
      deficiency = "Vitamin B12 deficiency";
    } else if (s.includes("slow healing")) {
      deficiency = "Zinc deficiency";
    }

    return Response.json({
      result: `Likely Deficiency: ${deficiency}
Confidence: Medium
Short Reason: Based on symptom association patterns.`,
    });

  } catch {
    return Response.json({ error: "Analyze failed" }, { status: 500 });
  }
}