const MemeComponent = (props: any) => {

    return (
        <div key={props.id} className="card">
            <img src={props.blank} alt={props.name} loading="lazy" />
            <p>{props.name}</p>
            <button
                className="btn btn-primary"
                type="button"
                onClick={() =>
                    props.handleOpen({
                        id: props.id,
                        name: props.name,
                        blank: props.blank,
                        lines: props.lines,
                    })
                }
            >
                Generate
            </button>
        </div>
    )
};

export default MemeComponent;