import { StyledLoading } from './styles';

export type LoadingProps = {
  size?: number;
};

const Loading = ({ size = 30 }: LoadingProps) => <StyledLoading size={size} />;

export default Loading;
