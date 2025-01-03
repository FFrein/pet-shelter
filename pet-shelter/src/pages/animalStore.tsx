import { GetAllAnimalsForm } from "../components/Animal/GetAllAnimalsForm";
import { useCallback, useEffect, useState } from "react";
import CriteriaList from "../components/CriteriaList";
import Dropdown from "../components/Dropdown";
import { AnimalTypesService } from "../api/services/all.services";

export const AnimalStore = () => {
  const [SearchCategories, setSearchCategories] = useState([]);
  const [country, setCountry] = useState<string>("");
  const [animalTypes, setAnimalTypes] = useState<Array<string>>(
    [] as Array<string>
  );
  const [type, setType] = useState("");

  const handleGetAnimalTypes = useCallback(async () => {
    try {
      const { data } = await AnimalTypesService.getAll();
      setAnimalTypes(
        data.map((elem: any) => {
          return elem.TypeName;
        })
      );
    } catch (e: any) {
      setAnimalTypes([]);
    }
  }, []);

  useEffect(() => {
    handleGetAnimalTypes();
  }, []);

  return (
    <div className="mx-auto w-[1200px]">
      <div className="m-2 p-2 flex flex-col gap-2">
        <div>
          <div className="flex flex-row gap-2 w-full justify-between">
            <GetAllAnimalsForm
              SearchCategories={[SearchCategories]}
              Country={country}
              Type={type}
            />
            <div className="mt-14">
              <div className="">
                <Dropdown
                  items={["Беларусь", "Россия", "Казахстан"]}
                  onSelect={setCountry}
                  placeholder={"Страна"}
                />
              </div>
              {/*
              <div className="mt-2">
                <Dropdown
                  items={["Минск", "Лида", "Казахстан"]}
                  onSelect={setCountry}
                  placeholder={"Город"}
                />
              </div>
              */}
              <div className="mt-2">
                <Dropdown
                  items={animalTypes}
                  onSelect={setType}
                  placeholder={"Тип"}
                />
              </div>
              <div className="mt-2">
                <CriteriaList setSearchCategories={setSearchCategories} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
