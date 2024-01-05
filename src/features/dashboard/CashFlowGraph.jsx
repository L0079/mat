import PropTypes from "prop-types";
import styled from "styled-components";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const StyledGraphContainer = styled.div`
  max-width: 100%;
  padding-left: 40px;
  align-items: center;
`;

function CashFlowGraph({ graphData, start, end }) {
  let data = graphData;
  if (start && end && end > start) data = graphData.slice(start, end + 1);

  return (
    <StyledGraphContainer>
      <LineChart width={1248} height={500} data={data} style={{ fontSize: "1rem" }}>
        <XAxis dataKey="date" minTickGap={10} tick={{ fill: "var(--color-indigo-700)" }} />
        <YAxis tick={{ fill: "var(--color-indigo-700)" }} />
        <CartesianGrid stroke="var(--color-grey-100)" strokeDasharray="2 2" />
        <Line type="monotone" dataKey="balance" stroke="var(--color-indigo-700)" strokeWidth={2} dot={false} />
      </LineChart>
    </StyledGraphContainer>
  );
}

CashFlowGraph.propTypes = {
  graphData: PropTypes.array.isRequired,
  start: PropTypes.number,
  end: PropTypes.number,
};

export default CashFlowGraph;
