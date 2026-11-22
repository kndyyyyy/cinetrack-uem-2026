import './style/Spinner.css'

type SpinnerProps = {
    size: number
    color?: string
}

export default function Spinner(props:SpinnerProps) {
    return (
    <div
      className="spinner"
      style={{
        width: props.size,
        height: props.size,
        borderTopColor: props.color ? props.color : "#5e5c5c",
      }}
      role="status"
      aria-label="Carregando"
    />
  );
}