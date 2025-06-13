import ComponentLibrary from "../../components/droneR&D/component-design/ComponentLibrary";
import ComponentTableView from "../../components/droneR&D/component-design/ComponentTableView";
import ComponentView from "../../components/droneR&D/component-design/ComponentView";
import Header from "../../components/droneR&D/component-design/Header";

const ComponentDesign = () => {
  return (
    <div className="p-4">
      <Header />
      <ComponentTableView />
      <ComponentLibrary />
      <ComponentView />
    </div>
  );
};

export default ComponentDesign;
