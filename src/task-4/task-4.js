
export default function showDialog(dialogEl) {
    $(dialogEl).modal("show");

    return new Promise((resolve, reject) => {
        dialogEl.querySelector("button.yes").addEventListener('click',() => resolve())
        dialogEl.querySelector("button.no").addEventListener('click',() => reject())
    });
}
