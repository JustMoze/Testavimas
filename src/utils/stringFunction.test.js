import { ExpansionPanelActions } from "@material-ui/core";
import {getUserAccountName} from "./stringFunctions"

test("Test getUserAccauntName", () => {
    const val1 = "Hello@gmail.com"
    const val2 = "Hello World"
    const val3 = undefined
    expect(getUserAccountName(val1)).toEqual("Hello")
    expect(getUserAccountName(val2)).toEqual("Hello")
    expect(getUserAccountName(val3)).toBeNull()
});