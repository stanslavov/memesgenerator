import { useHttp } from "../hooks/use-http";
import { useEffect, useState } from "react";

import { Meme } from "../types";
import { isEmpty, isNil } from "lodash";

import { Modal } from "./Modal";
import MemeComponent from "./MemeComponent";

type ModalState = Pick<Meme, 'id' | 'name' | 'blank' | 'lines'>

const MemesComponent = () => {
    const { getAPIData, data, error } = useHttp();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentModal, setCurrentModal] = useState<ModalState>({
        id: '',
        name: '',
        blank: '',
        lines: 1,
    });

    useEffect(() => {
        (async () => {
            if (isEmpty(data) && isNil(error)) {
                await getAPIData();
            }
        })();
    }, [data, error, getAPIData]
    )

    const handleOpenModal = ({ id, name, blank, lines }: ModalState) => {
        setCurrentModal({ id, name, blank, lines })
        setIsModalOpen(true)
    };

    const handleCloseModal = () => {
        setCurrentModal({ id: '', name: '', blank: '', lines: 1 })
        setIsModalOpen(false)
    };

    return (
        <div className="App">
            <header>
                <h1 className="primary-gradient">MEME GENERATOR</h1>
                <p>Choose a template and customize the text to your likings</p>
            </header>
            <section className="memes">
                {isModalOpen && currentModal.id && (
                    <Modal
                        id={currentModal.id}
                        name={currentModal.name}
                        blank={currentModal.blank}
                        lines={currentModal.lines}
                        handleCloseModal={handleCloseModal}
                    />
                )}
                {data && data.map((meme) => {
                    return (
                        <MemeComponent id={meme.id} name={meme.name} blank={meme.blank} lines={meme.lines} handleOpen={handleOpenModal} />
                    )
                })}
            </section>
        </div>
    );
};

export default MemesComponent;