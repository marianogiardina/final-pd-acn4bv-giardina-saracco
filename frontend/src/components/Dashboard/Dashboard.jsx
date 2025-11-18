import Table from "../table/table";


// TODO: reemplazar con datos del endpoint
const fonts = [
  {
    id: 1,
    name: "Sansation",
    size: "16px",
    style: "italic",
    weight: "normal",
    category: "moderna",
  },
  {
    id: 2,
    name: "Roboto",
    size: "14px",
    style: "normal",
    weight: "bold",
    category: "moderna",
  },
  {
    id: 3,
    name: "Open Sans",
    size: "18px",
    style: "normal",
    weight: "light",
    category: "sans-serif",
  },
];

const Dashboard = () => {
  return (
    <div>
      <Table fonts={fonts} />
    </div>
  );
};

export default Dashboard;
