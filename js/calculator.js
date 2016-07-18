$(document).ready(function () {

	var input = "";
	var exp = [];
	var resultOnDisplay = false;
	var result = 0;

	var buildExp = function (x) {
			console.log("input is:" + x);
			console.log("typeOf(x): " + typeof x);
			if (typeof x === "number" || x === ".") {
				console.log("its a number or a period!")
				input += x;
				console.log(input);
			} else {
				if (input.indexOf(".") === -1) {
					exp.push(parseInt(input));
					input = "";
					exp.push(x);
					console.log(exp);
				} else {
					exp.push(parseFloat(input));
					input = "";
					exp.push(x);
					console.log(exp);
				}

			}

		} // end buildExp()

	var calculate = function () {
			console.log("inside calculate()");
			var operator = "";
			result = exp.reduce(function (a, b) {
				console.log(a, b);
				if (!!operator) {
					console.log("there is something in operator: " + operator);
					var op = operator;
					operator = "";
					if (op === "+") {
						return a + b;
					} else if (op === "-") {
						return a - b;
					} else if (op === "*") {
						return a * b;
					} else if (op === "/") {
						return a / b;
					}

				} else if (b === "%") {
					return a / 100;
				} else {
					operator = b
					return a;
				}


			});

		
		var resultLength = "" + result;
		if (resultLength.length > 11){
			return result.toExponential(5);
		}
		
		return result;

		} // end calculate()

	var inputAfterResult = function (val) {
		resultOnDisplay = false;
		if (val === "number") {
			$("#display").html("&nbsp;");
		} else if (val === "operator") {
			input += result;
			result = 0;
		}
	}

	$("#0, #1, #2, #3, #4, #5, #6, #7, #8, #9").on("click", function () {
		if (input.length <= 10) {
			if (resultOnDisplay)
				inputAfterResult("number");
			console.log("in document")
			var value = parseInt($(this).attr("id"));
			$("#display").append(value);
			buildExp(value);
		}

	});

	$("#point").on("click", function () {
		if (input.length <= 10) {
			if (resultOnDisplay)
				inputAfterResult("number");
			var value = ".";
			$("#display").append(value);
			buildExp(value);
		}
	});

	$("#add, #subtract, #multiply, #divide, #percent").on("click", function () {
		if (resultOnDisplay)
			inputAfterResult("operator");
		var value = $(this).html().split("").filter(function (val) {
			return /[\+\-\*\/\%]/.test(val);
		}).join("");
		console.log(value);
		$("#display").html("&nbsp;");
		buildExp(value);
		if (value === "%")
			$("#enter").trigger("click");
	});

	$("#enter").on("click", function () {
		if (!resultOnDisplay) {
			var value = "enter";
			buildExp(value);
			$("#display").html("&nbsp;");
			$("#display").append(calculate());
			resultOnDisplay = true;
			exp = [];
			input = "";
		}
	});

	$("#all-clear").on("click", function () {
		$("#display").html("&nbsp;");
		exp = [];
		input = "";
	});

	$("#clear-entry").on("click", function () {
		$("#display").html("&nbsp;");
		input = "";
	});




}); //end document.ready
