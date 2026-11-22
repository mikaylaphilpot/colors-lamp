// AI-assisted: Initial implementation suggested by Copilot 
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

describe("search color browser flow", () => {
	test("sends the search request and renders the API results", () => {
		const elements = {
			searchText: { value: "blue" },
			colorSearchResult: { innerHTML: "" }
		};
		const colorList = { innerHTML: "" };
		const requests = [];
		const context = {
			document: {
				getElementById: (id) => elements[id],
				getElementsByTagName: () => [colorList]
			},
			XMLHttpRequest: class {
				open(method, url, async) {
					this.method = method;
					this.url = url;
					this.async = async;
					requests.push(this);
				}

				setRequestHeader(name, value) {
					this.header = { name, value };
				}

				send(payload) {
					this.payload = payload;
				}
			}
		};

		const source = fs.readFileSync(path.join(__dirname, "../public/js/code.js"), "utf8");
		vm.runInNewContext(source, context, { filename: "code.js" });
		vm.runInNewContext("userId = 42; searchColor();", context);

		expect(requests).toHaveLength(1);
		expect(requests[0].method).toBe("POST");
		expect(requests[0].url).toBe("http://COP4331-5.com/LAMPAPI/SearchColors.php");
		expect(JSON.parse(requests[0].payload)).toEqual({ search: "blue", userId: 42 });

		requests[0].readyState = 4;
		requests[0].status = 200;
		requests[0].responseText = JSON.stringify({ results: ["Blue", "Sky Blue"], error: "" });
		requests[0].onreadystatechange();

		expect(elements.colorSearchResult.innerHTML).toBe("Color(s) has been retrieved");
		expect(colorList.innerHTML).toBe("Blue<br />\r\nSky Blue");
	});
});