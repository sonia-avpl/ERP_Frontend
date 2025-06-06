import CertificationDashboard from "../../components/droneR&D/compliance-docs/CertificationDashboard"
import ComplianceChecklist from "../../components/droneR&D/compliance-docs/ComplianceChecklist"
import DGCAProcess from "../../components/droneR&D/compliance-docs/DGCAProcess"
import DocumentationRepo from "../../components/droneR&D/compliance-docs/DocumentationRepo"
import Heading from "../../components/droneR&D/compliance-docs/Heading"


const ComplianceDocs = () => {
  return (
   <>
   <Heading/>
   <CertificationDashboard/>
   <DocumentationRepo/>
   <DGCAProcess/>
   <ComplianceChecklist/>
   </>
  )
}

export default ComplianceDocs