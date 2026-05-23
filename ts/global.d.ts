// to remove css errror for ts in layout.tsx
declare module "*.css" {
    const content: { [className: string]: string };
    export default content;
}