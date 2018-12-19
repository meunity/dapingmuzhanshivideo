export function CreateAll(All, Node, Parent) {
    Node.Parent = Parent;
    All[Node.Id] = Node;
    if (Node.Children.length > 0) {
        var Depth = 1;
        for (var i = 0, Arr = Node.Children, len = Arr.length; i < len; i++) {
            CreateAll(All, Arr[i], Node);
            if (Arr[i].Depth > Depth) {
                Depth = Arr[i].Depth;
            }
        }
        Node.Depth = Depth + 1;
    }
    else {
        Node.Depth = 1;
    }
};
export function getFirstMenu(Menus) {
    var CurrentMenu = "";
    if (Menus.Children.length > 0) {
        if (Menus.Children[0].Val) {
            CurrentMenu = Menus.Children[0].Val;
        } else {
            if (Menus.Children[0].Children.length > 0) {
                if (Menus.Children[0].Children[0].Val) {
                    CurrentMenu = Menus.Children[0].Children[0].Val;
                } else {
                    if (Menus.Children[0].Children[0].Children.length > 0) {
                        if (Menus.Children[0].Children[0].Children[0].Val) {
                            CurrentMenu = Menus.Children[0].Children[0].Children[0].Val;
                        }
                    }
                }
            }
        }
    }
    return CurrentMenu;
};