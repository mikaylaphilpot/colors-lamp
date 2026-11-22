// AI-assisted: Initial implementation suggested by Copilot 
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

describe("addColor", () => {
	test("posts the entered color for the logged-in user and reports success", () => {
		const elements = {
			colorText: { value: "Cerulean" },
			colorAddResult: { innerHTML: "previous result" }
		};
		const requests = [];
		const context = {
			document: {
				getElementById: (id) => elements[id]
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
		vm.runInNewContext("userId = 42; addColor();", context);

		expect(elements.colorAddResult.innerHTML).toBe("");
		expect(requests).toHaveLength(1);
		expect(requests[0].method).toBe("POST");
		expect(requests[0].url).toBe("http://COP4331-5.com/LAMPAPI/AddColor.php");
		expect(requests[0].async).toBe(true);
		expect(requests[0].header).toEqual({
			name: "Content-type",
			value: "application/json; charset=UTF-8"
		});
		expect(JSON.parse(requests[0].payload)).toEqual({ color: "Cerulean", userId: 42 });

		requests[0].readyState = 4;
		requests[0].status = 200;
		requests[0].onreadystatechange();

		expect(elements.colorAddResult.innerHTML).toBe("Color has been added");
	});
});