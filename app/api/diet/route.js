export async function POST(req) {
  try {
    const { location, budget, dietType, deficiency } = await req.json();

    let plan = "";

    const def = deficiency.toLowerCase();

    if (def.includes("iron")) {
      plan = `
Breakfast:
Poha with peanuts and lemon

Lunch:
Dal, rice, and spinach sabzi

Dinner:
Roti with mixed vegetable curry

Snack:
Roasted chana

Why This Plan Helps:
Includes iron-rich lentils and leafy greens.

Estimated Budget Category:
${budget}
`;
    }

    else if (def.includes("magnesium")) {
      plan = `
Breakfast:
Banana and oatmeal

Lunch:
Brown rice with rajma

Dinner:
Roti with pumpkin and leafy greens

Snack:
Handful of peanuts

Why This Plan Helps:
Magnesium-rich legumes and whole grains.

Estimated Budget Category:
${budget}
`;
    }

    else if (def.includes("vitamin d")) {
      plan = `
Breakfast:
Boiled eggs or fortified milk

Lunch:
Mushroom curry with rice

Dinner:
Roti with paneer and spinach

Snack:
Sunflower seeds

Why This Plan Helps:
Vitamin D supportive foods.

Estimated Budget Category:
${budget}
`;
    }

    else {
      plan = `
Breakfast:
Oats with fruits

Lunch:
Dal, rice, and vegetables

Dinner:
Roti with curry

Snack:
Mixed nuts

Why This Plan Helps:
Balanced nutrition support.

Estimated Budget Category:
${budget}
`;
    }

    return Response.json({ result: plan });

  } catch (error) {
    console.error(error);
    return Response.json({ error: "Diet failed" }, { status: 500 });
  }
}