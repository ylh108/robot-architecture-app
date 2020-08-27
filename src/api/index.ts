import request from "@/http/index.ts";
import qs from "qs";
// 部门
export function getExpertDept() {
  return request({
    url: "/ReviewExportDBHandler.ashx?action=getdeptparams",
    method: "get"
  });
}
// 岗位类别
export function getExpertPostType(data?: any) {
  return request({
    url: "",
    method: "get",
    data
  });
}
// 查询
export function getExpert(data: any = {}) {
  return request({
    url: `/ReviewExportDBHandler.ashx?action=searchexpertbyperson&post=${data.post ||
      ""}&dept=${data.dept || ""}`,
    method: "get"
  });
}
// 删除
export function delExpert(data: any = {}) {
  return request({
    url: `/ReviewExportDBHandler.ashx?action=delete&cid=${data.cid}`,
    method: "get"
  });
}
// 保存
export function saveExpert(data: any = {}) {
  return request({
    url: `/ReviewExportDBHandler.ashx?action=save`,
    method: "post",
    data: qs.stringify({ formdata: data })
  });
}
