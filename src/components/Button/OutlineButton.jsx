
function OutilneButton({ lable, click, type }) {
    return (
        <div>

            <button
                type={type}
                onClick={click}
                className=" border border-primary text-primary hover:bg-primary/10 hover:shadow-xl rounded-xl py-2 px-8">{lable}</button>

        </div>
    )
}

export default OutilneButton