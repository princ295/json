import moment from "moment";
import { getCurrentDate } from "../constants";
import { WorkProposalApi } from "../services/api/workProposalApi";

export const addBasicDetailsProposalaRequest = async (payload) => {

  console.log('***********payload***************',moment(new Date(payload.proposalByDate).toDateString()).format('dd/mm/yyyy'));
  console.log(payload)

  const _placeofwork = [];
  const _placeofworkmapping = [];

  payload.coverageArea?.forEach((item, index) => {


    _placeofwork.push({
      "rowId": index,
      districtId: item.districtId,
      districtName: item.districtName,
      "workLevel": item.coverageWorkLevelofWorkValue,
      // "coverageDistrictId": 0,
      // "coverageDistrictName": "string",
      "areaId": item.areaId,
      "areaName": item.areaName,
      "tehsilId": item.coverageWorkTehsilValue,
      "tehsilName": item.coverageWorkTehsil,
      "panchayatId": item.coverageWorkGramPanchayatValue,
      "panchayatName": item.coverageWorkGramPanchayat,
      "isVillageWardAvailable": ["Village Level"].includes(item.coverageWorkLevelofWork?.name) ? 1 : 0,
      "ulbId": item.coverageWorkUlbValue,
      "ulbName": item.coverageWorkUlb,
      "acNo": item.coverageWorkVidhanShabhaValue,
      "acName": item.coverageWorkVidhanShabha,
      "typeofBeneficiariesId": item.coverageWorkBeneficiaryType,
      "typeofBeneficiaries":  item.coverageWorkBeneficiarie,
      "noofBeneficiaries": 0,
      "blockId": item.coverageWorkBlockValue,
      "blockName": item.coverageWorkBlock,
      "remark": "string"
    })

    item?._coverageWorkVillage?.forEach(el=> {
      _placeofworkmapping.push({
        "rowId": index,
        "workId": 0,
        "villageOrWardId": el.value,
        "villageOrWardName": el.name
      })
    })
  })

  const _payload = {
    "moduleId": 11,
    "workId": 0,
    "workName": payload.workProposalName,
    "workPriority": payload.workProposalWorkPriority?.value,
    "workPriorityName": payload.workProposalWorkPriority?.label,
    "workCategory": payload.workProposalWorkSector?.value,
    "workCategoryName": payload.workProposalWorkSector?.label,
    "workSubCategory": payload.workProposalSubSector?.value,
    "workSubCategoryName": payload.workProposalSubSector?.label,
    "relatedDepartment": payload.workProposalRelatedDepartment?.value,
    "relatedDepartmentName": payload.workProposalRelatedDepartment?.label,
    "objectiveWork": payload.workProposalObjectiveofWork,
    "justificationOfWork": payload.workProposalJustificationofWork,
    "financialYear": payload.workProposalFinacialYear.value,
    "sourceOfProposal": payload.workProposalProposedBy.value,
    "sourceOfProposalName": payload.workProposalProposedBy.label,
    // yes
    "isFile": payload.workProposalFile.length,
    "isTechnicalEntry": payload.workProposalisAddTechnicalProposal,
    "technicalEntryYesNo":  payload.workProposalisAddTechnicalProposal == "1" ? "Yes":"No",

    // COVERAGE AREA
    "areaStatusType": payload.coverageWorkStatusArea?.value,
    "areaStatusTypeName": payload.coverageWorkStatusArea?.label,
    // "placeOfWork": 

    "placeOfWork": _placeofwork,
    "placeOfWorkVillageWardMapping": _placeofworkmapping,
    
    // Proposal 

    "districtId": '387', 
    // * **********payload.proposalByDistrict.value,
    "districtName": 'RAIPUR',
    // payload.proposalByDistrict.label,
    // "estimatedAgency": payload.proposalByAgency.value,
    "estimatedAgency": payload.proposalByEstimatedAgency?.value,
    "estimatedAgencyName": payload.proposalByAgency?.label,
    "proposedEstimatedCost": payload.proposalByEstimatedCost,
    "dateOfProposal": moment(new Date(payload.proposalByDate).toDateString()).format('DD/MM/YYYY'),
    //getCurrentDate(),
    //current_date_obj.toLocaleString(), 
    "durationOfWork": payload.proposalByDurationofWork, // take diffrence
    "anumodanPratyasha": payload.proposalByDetailsisApprove,
    // "anumodanPratyasha": 0,
    // "anumodanPratyashaYesNo": "No",
    "anumodanPratyashaYesNo": payload.proposalByDetailsisApprove == 1? "Yes": "No",
    // get from global obj
    "userId": payload.userid,
    "entryDateTime": moment(new Date()).format('DD/MM/YYYY'),
    //current_date_obj.toLocaleString(),
    
    
    "typeOfBeneficiaries": 0,
    "typeOfBeneficiariesName": "",
    "noOfBeneficiaries": 0,
    "directAreaCost": 0,
    "indirectAreaCost": 0,
    "message": null,
    "proposedWorkStatus":null,
    "proposedWorkTransaction":null,
    "proposedWorkMaster":null,
    "documentStore": null,
    // technical detail
    "proposedWorkTechnicalDetail":null,
    "draftVerificationDetails": null,
    "proposedWorkLocation":null,
    "sanctionDetails": null,
    "fundStatus":null,
    "workProgressStatus": null,
    // Extra added field
  
  }

  console.log(payload, _payload)
    try {
      await WorkProposalApi.addBasicDetailsOfdWorkProposal(_payload);
       alert("Data Inserted Sucessfully")
       return
    }
    catch {
      console.log('Getting Error');
      return []
    }
    finally {}
  }
  
  