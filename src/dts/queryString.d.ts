declare class QueryString {
	stringify : (any) => string;
	parse : (string) => any;
	extract : (string) => string;
}