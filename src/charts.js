console.log("hello chart graph");
const xValues = ["Querries", "Likes", "Blogs", "Comments"];
const yValues = [37, 208, 92, 29];
const barColors = ["#ae33bc", "#a30303", "#a5a801", "#46dcb5"];

new Chart("myChart", {
  type: "pie",
  data: {
    labels: xValues,
    datasets: [
      {
        backgroundColor: barColors,
        data: yValues,
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,

    plugins: {
      legend: {
        position: "right",
      },
    },
    title: {
      display: true,
      title: "charts graph",
    },
  },
});
