import React, {useState, useEffect} from 'react';
import {Dropdown, Form, FormControl, InputGroup} from 'react-bootstrap';
import ProductService from "../../services/ProductService";

const Shop = () => {
    const [sort, setSort] = useState('');
    const [search, setSearch] = useState('');
    // const [products, setProducts] = useState([]);

    useEffect(() => {

    }, []);

    const handleSort = (e) => {
        setSort(e.target.value);
    };

    const handleSearch = (e) => {
        setSearch(e.target.value);
    };

    return (
        <div>
            <InputGroup className="mb-3">
                <Dropdown>
                    <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                        Отсортировать по
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item onClick={handleSort} value="popular">
                            Популярности
                        </Dropdown.Item>
                        <Dropdown.Item onClick={handleSort} value="popular">
                            Дате добавления
                        </Dropdown.Item>
                    </Dropdown.Menu>

                </Dropdown>

                <FormControl
                    type="text"
                    placeholder="Найти"
                    className="mr-sm-2"
                    value={search}
                    onChange={handleSearch}
                />
            </InputGroup>



            <Dropdown>
                <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                    Мои брэнды
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    {/* Render list of user's brands here */}
                </Dropdown.Menu>
            </Dropdown>
        </div>
    );
};

export default Shop;
