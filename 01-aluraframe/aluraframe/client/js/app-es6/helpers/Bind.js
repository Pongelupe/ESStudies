class Bind {
    constructor(model, view, ...props) {

        let proxy = ProxyFactory.build(model, props, model => {
            view.update(model)
        });

        view.update(model);
        return proxy;
    }
}