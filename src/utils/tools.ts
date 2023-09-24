import { User } from "@prisma/client";

const dateTimeFormatter = new Intl.DateTimeFormat(undefined, {
    dateStyle: "short",
});

const showName: (user: User) => string = (user: User): string => {
    if (user.displayName) {
        return user.displayName;
    } else {
        return user.name ?? user.id;
    }
};

export { dateTimeFormatter, showName };
