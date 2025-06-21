import SkuCard from "../../components/card/SkuCard";
import { MdPendingActions, MdOutlinePending } from "react-icons/md";
import { FaBoxOpen } from "react-icons/fa";
import { TbUrgent } from "react-icons/tb";
const stats = [
  {
    title: "Pending Requisitions",
    value: "24",
    subtitle: "Awaiting approval",
    icon: <MdPendingActions className="h-5 w-5" />,
  },
  {
    title: "Open POs",
    value: "18",
    subtitle: "In progress",
    icon: <FaBoxOpen className="h-5 w-5" />,
  },
  {
    title: "Pending Deliveries",
    value: "12",
    subtitle: "To be received",
    icon: <MdOutlinePending className="h-5 w-5"/>,
  },
  {
    title: "Urgent Procurements",
    value: "7",
    subtitle: "This week",
    icon: <TbUrgent className="h-5 w-5" />,
  },
];

const Procurement = () => {
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
    </section>
  );
};

export default Procurement;
