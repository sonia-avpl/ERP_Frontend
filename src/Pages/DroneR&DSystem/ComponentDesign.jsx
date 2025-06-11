import ComponentLibrary from "../../components/droneR&D/component-design/ComponentLibrary";
import ComponentView from "../../components/droneR&D/component-design/ComponentView";
import Header from "../../components/droneR&D/component-design/Header";

const ComponentDesign = () => {
  return (
    <div className="p-4">
      <Header />
      <ComponentView />
      <ComponentLibrary />
    </div>
  );
};

export default ComponentDesign;
