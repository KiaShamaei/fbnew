export function createInputHidden(name: string, v: any) {
    const input = document.createElement('input')
    input.type = 'hidden'
    input.name = name;
    input.value = v;
    return input;
}

export function redirectToPaymentPortal(params: any, method: string, url: string) {
    const form = document.createElement('form')
    form.action = url;
    form.method = method;
    form.style.display = 'none';
    Object.entries(params).forEach(([key, value]) => {
        const input = createInputHidden(key, value)
        form.appendChild(input)
    })
    document.body.appendChild(form)
    form.submit();
}