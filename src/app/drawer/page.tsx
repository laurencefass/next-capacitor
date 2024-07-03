import { Drawer } from "@/components/Drawer";

export default function Page() {
    return <>
        <div style={{
            width: "100vw",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        }}>
            <h1>Draggable block demonstration</h1>
        </div>
        <Drawer />
    </>
}