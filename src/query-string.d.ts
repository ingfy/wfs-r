declare module 'query-string' {
	function parse (any): string;
	function extract (string): string;
	function stringify (string): any;
}