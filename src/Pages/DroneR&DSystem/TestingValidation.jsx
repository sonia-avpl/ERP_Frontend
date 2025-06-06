import DefectsTracking from "../../components/droneR&D/testing-validation/DefectsTracking"
import TestAnalytics from "../../components/droneR&D/testing-validation/TestAnalytics"
import TestingCard from "../../components/droneR&D/testing-validation/TestingCard"
import TestModuleHeader from "../../components/droneR&D/testing-validation/TestModuleHeader"
import ValidationReports from "./ValidationReports"


const TestingValidation = () => {
  return (
    <>
    <TestModuleHeader/>
    <TestingCard/>
    <TestAnalytics/>
    <DefectsTracking/>
    <ValidationReports/>
    </>
  )
}

export default TestingValidation