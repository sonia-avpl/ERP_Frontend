import ComponentLibrary from "../../components/droneR&D/component-design/ComponentLibrary";
import ComponentTableView from "../../components/droneR&D/component-design/ComponentTableView";
import ComponentView from "../../components/droneR&D/component-design/ComponentView";
import Header from "../../components/droneR&D/component-design/Header";
import { useGet } from "../../hooks/useGet";

const ComponentDesign = () => {
    const { data,refetch } = useGet(`components`);
    const { data: categories } = useGet(`categories`);
 
  return (
    <div className="p-4">
      <Header/>
      <ComponentTableView data={data} refetch={refetch}/>
      <ComponentLibrary data={categories}/>
    </div>
  );
};

export default ComponentDesign;
