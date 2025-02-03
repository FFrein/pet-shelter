import { useEffect, useState } from "react";
import { CriteriaService } from "../api/services/criteria.service.js";

export interface CriteriaListProps {
  setSearchCategories: any;
}

const CriteriaList: React.FC<CriteriaListProps> = ({ setSearchCategories }) => {
  const [selectedCategories, setSelectedCategories] = useState<Array<number>>(
    []
  );

  const HandleOnClickAddCategorie = (id: number) => {
    setSelectedCategories([...selectedCategories, id]);
    setSearchCategories([...selectedCategories, id]);
  };
  const HandleOnClickDeleteCategorie = (id: number) => {
    setSelectedCategories(selectedCategories.filter((e: number) => e != id));
    setSearchCategories(selectedCategories.filter((e: number) => e != id));
  };

  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const fetchCategories = async () => {
      const { data } = await CriteriaService.getAll(0);
      setCategories(data);
    };

    fetchCategories();
  }, []);

  return (
    <div className="p-4 border border-[#062d3e] rounded">
      <ul className="flex flex-col h-[376px] overflow-y-auto overflow-x-hidden">
        {categories
          ? categories.map((e: any) => {
              return (
                <li
                  onClick={
                    selectedCategories.indexOf(e.ID) == -1
                      ? () => {
                          HandleOnClickAddCategorie(e.ID);
                        }
                      : () => {
                          HandleOnClickDeleteCategorie(e.ID);
                        }
                  }
                  className={`categorie ${
                    selectedCategories.indexOf(e.ID) == -1
                      ? ""
                      : "opacity-[0.5]"
                  }`}
                  key={e.ID}
                >
                  {e.Name}
                </li>
              );
            })
          : ""}
      </ul>
    </div>
  );
};

export default CriteriaList;
