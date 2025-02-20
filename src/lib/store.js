// 简单的内存存储
const viewsStore = new Map();

export function getViews(id) {
    return viewsStore.get(id) || 0;
}

export function incrementViews(id) {
    const currentViews = viewsStore.get(id) || 0;
    viewsStore.set(id, currentViews + 1);
    return currentViews + 1;
} 