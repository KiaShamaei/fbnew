
interface Props {
  isGreen: boolean;
}

const TurnoverBackground = ({
  isGreen
}: Props) => {
  return <svg style={{ transform: 'translate(-8px, 0px)' }} xmlns="http://www.w3.org/2000/svg" width="137.022" height="71.787" viewBox="0 0 137.022 71.787">
    <g id="Group_2199" data-name="Group 2199" transform="translate(-928.395 -511.88)">
      <path id="Path_4444" data-name="Path 4444" d="M-1870.541-250.9a68.125,68.125,0,0,0-16.282,44.065" transform="translate(2817.218 788.499)" fill="none" stroke={isGreen ? '#72e1c0' : "#fe99a8"} stroke-linecap="round" stroke-width="4" />
      <path id="Path_4445" data-name="Path 4445" d="M-1811.343-288.335A67.974,67.974,0,0,0-1853.034-270" transform="translate(2804.731 802.335)" fill="none" stroke={isGreen ? "#72e1c0" : '#fe99a8'} stroke-linecap="round" stroke-width="4" />
      <path id="Path_4446" data-name="Path 4446" d="M-1701.649-250.9a68.131,68.131,0,0,1,16.282,44.065" transform="translate(2748.784 788.499)" fill="none" stroke={isGreen ? '#00c288' : "#ff526d"} stroke-linecap="round" stroke-width="4" />
      <path id="Path_4447" data-name="Path 4447" d="M-1775.743-288.335A67.975,67.975,0,0,1-1734.051-270" transform="translate(2776.167 802.335)" fill="none" stroke={isGreen ? '#00c288' : "#ff526d"} stroke-linecap="round" stroke-width="4" />
    </g>
  </svg>


}

export default TurnoverBackground