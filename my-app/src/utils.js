/**
 * 根据用户类型和信息 返回跳转地址
 * 1. boss ——> /boss
 * 2. genius ——> /genius
 * 3. 是否有头像 avatar
 *    无 ——> /bossinfo 或 /geniusinfo
 * @export function
 */
export function getRedirectPath({ type, avatar }) {
    let url = type === 'boss' ? '/boss' : '/genius';
    if (!avatar) {
        url += 'info';
    }
    return url;
}