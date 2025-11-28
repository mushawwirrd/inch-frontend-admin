function Button({ lable, click, type }) {
    return (
        <div>

            <button
                type={type}
                onClick={click}
                className="bg-primary hover:bg-green-500 hover:shadow-xl duration-200 text-white rounded-xl w-24 py-2 px-3">{lable}</button>

        </div>
    )
}

export default Button