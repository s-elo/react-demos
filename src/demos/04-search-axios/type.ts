interface Data {
    login?: any,
    html_url?: string,
    avatar_url?: string
}

export type Status = {
  data?: Array<Data>;
  isFirst?: boolean;
  isLoading?: boolean;
  err?: string;
};

export type SearchProps = {
    updateState: (status: Status) => void;
}
