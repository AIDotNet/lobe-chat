import { postJson, get, del, putJson, post } from '../utils/fetch';

const prefix = `/api/v1/ChatApplications`;

/**
 * 创建聊天应用程序。
 * @param data - 聊天应用程序的数据。
 */
export function CreateChatApplications(data: any) {
    return postJson(prefix, data);
}

/**
 * 更新聊天应用程序。
 * @param data - 聊天应用程序的数据。
 */
export function PutChatApplications(data: any) {
    return putJson(prefix, data);
}

/**
 * 根据聊天应用的ID删除聊天应用。
 */
export function DeleteChatApplications(id: string) {
    return del(`${prefix}/${id}`);
}

/**
 * 通过ID获取聊天应用程序。
 * @param id - 聊天应用程序的ID。
 */
export function GetChatApplications(id: string) : Promise<any> {
    return get(`${prefix}/${id}`);
}

/**
 * 获取聊天应用程序列表。
 */
export function GetChatApplicationsList(page: number, pageSize: number) : Promise<any> {
    return get(`${prefix}/List?page=${page}&pageSize=${pageSize}`);
}

/**
 * 获取分享聊天应用程序列表。
 */
export function GetChatShareApplication(chatShareId: string) {
    return get(`${prefix}/ChatShareApplication?chatShareId=${chatShareId}`);
}

/**
 * 创建聊天应用程序。
 * @param data - 聊天应用程序的数据。
 */
export function CreateChatDialog(data: any) {
    return postJson(`${prefix}/ChatDialog`, data);
}

/**
 * 获取指定应用程序的聊天对话框。
 * @param applicationId 
 * @param all 
 * @returns 
 */
export function GetChatDialog(applicationId: string, all: boolean) {
    return get(`${prefix}/ChatDialog?applicationId=${applicationId}&all=${all}`);
}

/**
 * 获取分享聊天对话框。
 * @param chatId 
 * @returns 
 */
export function GetChatShareDialog(chatId: string) {
    return get(`${prefix}/ChatShareDialog?chatId=${chatId}`);
}

// 使用fetch获取数组的sse接口返回的参数
export function GetChatDialogSse(applicationId: string) {
    return get(`${prefix}/ChatDialogSse?applicationId=${applicationId}`);
}

/**
 * 创建聊天对话框历史记录。
 * @param data 
 * @returns
 */
export function CreateChatDialogHistory(data: any) {
    return postJson(`${prefix}/ChatDialogHistory`, data);
}

/**
 * 获取聊天对话框历史记录。
 * @param chatDialogId 
 * @param page 
 * @param pageSize 
 * @returns 
 */
export function GetChatDialogHistory(chatDialogId: string, page: number, pageSize: number) {
    return get(`${prefix}/ChatDialogHistory?chatDialogId=${chatDialogId}&page=${page}&pageSize=${pageSize}`);
}

/**
 * 删除聊天对话框历史记录。
 * @param id 
 * @returns 
 */
export function DeleteDialogHistory(id: string) {
    return del(`${prefix}/DialogHistory/${id}`);
}

/**
 * 创建聊天分享。
 * @param data 
 * @returns 
 */
export function CreateShare(data: any) {
    return postJson(`${prefix}/Share`, data);
}

/**
 * 获取聊天分享。
 * @param chatId 
 * @returns 
 */
export function GetChatShareList(chatApplicationId: string, page: number, pageSize: number) {
    return get(`${prefix}/ChatShareList?chatApplicationId=${chatApplicationId}&page=${page}&pageSize=${pageSize}`);
}

/**
 * 删除聊天分享。
 * @param id 需要删除的聊天分享的ID。
 */
export function RemoveChatShare(id:string){
    return del(`${prefix}/ChatShare/${id}`);
}

/**
 * 删除聊天分享。
 * @param id 
 * @returns 
 */
export function DeleteDialog(id: string) {
    return del(`${prefix}/Dialog/${id}`);
}

/**
 * 更新聊天分享。
 * @param data 
 * @returns 
 */
export function PutDialog(data: any) {
    return putJson(`${prefix}/Dialog`, data);
}


/**
 * 删除聊天分享。
 * @param data 
 * @returns 
 */
export function DeleteShareDialog(id: string,chatId: string) {
    return del(`${prefix}/ShareDialog/${id}?chatId=`+chatId);
}


/**
 * 更新聊天分享。
 * @param data 
 * @returns 
 */
export function PutShareDialog(data: any) {
    return putJson(`${prefix}/ShareDialog`, data);
}

/**
 * 获取聊天分享。
 * @param chatId 
 * @returns 
 */
export function GetSessionLogDialog(chatApplicationId: string, page: number, pageSize: number) : Promise<any>{
    return get(`${prefix}/SessionLogDialog?chatApplicationId=${chatApplicationId}&page=${page}&pageSize=${pageSize}`);
}

/**
 * 编辑聊天分享。
 * @param chatId 
 * @returns 
 */
export function PutChatHistory(data: any) {
    return putJson(`${prefix}/ChatHistory`, data);
}

/**
 * 获取聊天记录详情
 * @param chatId 
 * @returns 
 */
export function GetChatDialogHistoryInfo(historyId: string) {
    return get(`${prefix}/ChatDialogHistoryInfo?historyId=${historyId}`);
}

/**
 * 删除指定对话框所有历史记录
 */
export function PurageMessageHistory(dialogId:string){
    return post(`${prefix}/PurgeMessageHistory?dialogId=${dialogId}`);
}

export function CreateQuestions(data: any) {
    return postJson(`${prefix}/Questions`, data);
}

export function GetQuestions(applicationId: string) {
    return get(`${prefix}/Questions?applicationId=${applicationId}`);
}

export function RemoveQuestions(id:string){
    return del(`${prefix}/Questions/${id}`);
}

export function SharedQuestions(id:string){
    return get(`${prefix}/SharedQuestions?sharedId=${id}`);
}