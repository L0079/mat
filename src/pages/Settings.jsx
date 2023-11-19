import Heading from "../ui/Heading";
import Row from "../ui/Row";
import ParametersSetting from "../features/settings/ParametersSetting";
import SetFiscalYear from "../features/settings/SetFiscalYear";

function Settings() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Settings</Heading>
      </Row>
      <Row>
        <SetFiscalYear />
      </Row>
      <Row>
        <ParametersSetting />
      </Row>
    </>
  );
}

export default Settings;
