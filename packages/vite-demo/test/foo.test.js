// @flow
import Foo from "../src/foo.js";

describe("foo", () => {
    test("the title should be 'Hello, world!'", async () => {     
        const element = await render(<Foo>Hello, world!</Foo>);
        const text = await element.getText();
        expect(text).toBe("Hello, world!");
    });

    test("it should work arrow expressions", async () => {
        const element = await render(() => {
            const msg = "Hello, world!";
            return <Foo>{msg}</Foo>;
        });
        const text = await element.getText();
        expect(text).toBe("Hello, world!");
    });
});
