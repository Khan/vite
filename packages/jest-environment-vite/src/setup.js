import ipc from "node-ipc";

beforeEach(async () => {
    await driver.get(`http://localhost:3000/`);
});

// TODO: provide an option to only call driver.get() once
// We currently reload the page before each test.  This gets rid of any global 
// state a test or component might have created.  In some case we may
// know that no global state is being created in which case only calling
// driver.get() once will result in faster test runs.
afterEach(async () => {
    const coverage = await driver.executeScript("return window.__coverage__");

    ipc.config.silent = true;
    ipc.connectTo('vite', () => {
        ipc.of.vite.on('connect', () => {
            ipc.of.vite.emit('coverage', coverage);
            ipc.disconnect('vite');
        });
    });

    await driver.executeScript((containers) => {
        (async () => {
            const ReactDOM = (await import("/node_modules/react-dom.js")).default;
            for (const container of containers) {
                ReactDOM.unmountComponentAtNode(container);
                document.body.removeChild(container);
            }
        })();
    }, __containers__);
    __containers__.length = 0;
});
