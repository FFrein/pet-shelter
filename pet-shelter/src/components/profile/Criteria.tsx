import { observer } from "mobx-react-lite";

import { CreateCriteriaForm } from "../Criteria/CreateCriteriaForm";
import { DeleteCriteriaForm } from "../Criteria/DeleteCriteriaForm";
//import { UpdateCriteriaForm } from "../Criteria/UpdateCriteriaForm";
import { GetAllCriteria } from "../Criteria/GetAllCriteria";

export const CriteriaProfile = observer(() => {
  return (
    <div className="mx-auto">
      <div>
        <div className="flex flex-col gap-2"></div>
        <GetAllCriteria />
        <CreateCriteriaForm />
        {/*<UpdateCriteriaForm /> */}
        <DeleteCriteriaForm />
      </div>
    </div>
  );
});
