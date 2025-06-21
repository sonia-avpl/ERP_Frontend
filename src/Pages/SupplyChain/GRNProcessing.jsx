import { MdPendingActions, MdToday } from "react-icons/md";
import { FaArrowsSpin } from "react-icons/fa6";
import SkuCard from "../../components/card/SkuCard";
import GRNProcessingWorkflow from "../../components/SKU/grnProcessing/GRNProcessingWorkflow";

const stats = [
  {
    title: "Pending GRN",
    value: "18",
    subtitle: "Require processing",
    icon: <MdPendingActions className="h-5 w-5" />,
  },
  {
    title: "QC in Process",
    value: "12",
    subtitle: "Awaiting inspection",
    icon: <FaArrowsSpin  className="h-5 w-5" />,
  },
  {
    title: "Today's GRNs",
    value: "9",
    subtitle: "Received today",
    icon: <MdToday className="h-5 w-5" />,
  },
];

const GRNProcessing = () => {
  return (
    <section>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-6 bg-gray-50">
        {stats.map((card, index) => (
          <SkuCard
            key={index}
            title={card.title}
            value={card.value}
            subtitle={card.subtitle}
            icon={card.icon}
          />
        ))}
      </div>
      <GRNProcessingWorkflow />
    </section>
  );
};

export default GRNProcessing;
