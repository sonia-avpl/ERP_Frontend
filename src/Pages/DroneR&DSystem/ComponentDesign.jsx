import ComponentLibrary from "../../components/droneR&D/component-design/ComponentLibrary";
import ComponentView from "../../components/droneR&D/component-design/ComponentView";
import Header from "../../components/droneR&D/component-design/Header";

const ComponentDesign = () => {
  return (
    <div className="p-4">
      <Header />
      <ComponentLibrary />
      <ComponentView />
    </div>
  );
};

export default ComponentDesign;
