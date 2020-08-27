import Mock from "mockjs";
import expertPostType from "./expertPostType";
import expertDept from "./expertDept";
import expert from "./expert";
import saveExpert from "./saveExpert";

Mock.mock("/getExpertPostType", "post", expertPostType);
Mock.mock("/getExpertDept", "post", expertDept);
Mock.mock("/expert", "post", expert);
Mock.mock("/saveExpert", "post", saveExpert);

export default Mock;
