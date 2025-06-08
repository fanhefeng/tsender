import { describe, it, expect } from "vitest";
import { calculateTotal } from "./calculateTotal";


describe("calculateTotal", () => {
  it("should handle basic cases", () => {
    expect(calculateTotal("100")).toBe(100);
  });

  it("应正确计算空格分隔的数字字符串", () => {
    expect(calculateTotal("100 200")).toBe(300);
  });

  it("应正确计算换行符分隔的数字字符串", () => {
    expect(calculateTotal("100\n200")).toBe(300);
  });

  it("应正确计算包含小数的逗号和换行符分隔的数字字符串", () => {
    expect(calculateTotal("1.5,2.5\n3.5")).toBe(7.5);
  });

  it("应忽略无效值并正确计算有效数字的总和", () => {
    expect(calculateTotal("200 ,,300\n\n400")).toBe(900);
  });
  it("应返回逗号分隔字符串中有效数字的总和", () => {
    const result = calculateTotal("100, 200, 300");
    expect(result).toBe(600);
  });

  it("应忽略非数字值", () => {
    const result = calculateTotal("100, abc, 200, , 300");
    expect(result).toBe(600);
  });
  it("应忽略非数字值", () => {
    const result = calculateTotal("12three\n45");
    expect(result).toBe(57);
  });

  it("应处理换行符和空格", () => {
    const result = calculateTotal("100\n 200, 300 \n 400");
    expect(result).toBe(1000);
  });

  it("对于空输入应返回 0", () => {
    const result = calculateTotal("");
    expect(result).toBe(0);
  });

  it("对于仅包含无效值的输入应返回 0", () => {
    const result = calculateTotal("abc, def, ghi");
    expect(result).toBe(0);
  });
});
