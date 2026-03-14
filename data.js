// data.js
const sportsData = {
  swimming: {
    title: "Swimming",
    img: "https://images.unsplash.com/photo-1530549387789-4c1017266635?auto=format&fit=crop&w=800&q=80",
    categories: {
      Coaching: [
        { desc: "15 Classes", price: 5000 },
        { desc: "Monthly (6 Classes/week)", price: 5000 },
        { desc: "Monthly (3 Classes/week)", price: 3500 },
      ],
      Membership: [
        { desc: "Monthly", price: 4500 },
        { desc: "Weekly (3 Days)", price: 3000 },
      ],
      Guest: [
        { desc: "Adults", price: 300 },
        { desc: "Kids", price: 200 },
      ],
    },
  },
  tennis: {
    title: "Tennis",
    img: "https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?auto=format&fit=crop&w=800&q=80",
    categories: {
      "Coaching (Monthly Fees)": [
        { desc: "Weekly 6 Classes", price: 3000 },
        { desc: "Weekly 3 Classes", price: 1800 },
      ],
      Guest: [{ desc: "1 Hour (Per Court)", price: 500 }],
    },
  },
  badminton: {
    title: "Badminton",
    img: "https://images.unsplash.com/photo-1521537634581-0dced2fee2ef?auto=format&fit=crop&w=800&q=80",
    categories: {
      "Coaching (Monthly Fees)": [
        { desc: "Weekly 6 Classes", price: 3000 },
        { desc: "Weekly 3 Classes", price: 1800 },
      ],
      Membership: [{ desc: "Monthly", price: 1500 }],
      Guest: [{ desc: "1 Hour (Per Court)", price: 500 }],
    },
  },
  skating: {
    title: "Skating",
    // USING YOUR PROVIDED IMAGE LINK
    img: "https://powerslide.com/cdn/shop/collections/racing_top_baner_2_b0293283-dc4f-42cb-8a85-24b4f9c46e4d.jpg?height=600&v=1748006552",
    categories: {
      Coaching: [{ desc: "Monthly", price: 2500 }],
    },
  },
  basketball: {
    title: "Basketball",
    img: "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=800&q=80",
    categories: {
      "Coaching (Monthly Fees)": [
        { desc: "Weekly 6 Classes", price: 3000 },
        { desc: "Weekly 3 Classes", price: 1800 },
      ],
      Membership: [{ desc: "Monthly", price: 1500 }],
      Guest: [{ desc: "Half Court", price: 500 }],
    },
  },
};
