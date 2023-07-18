// interface handleDialogueMessageSendInterface {
//     setIsSending: any;
//     action: any;

// }

import axios from "axios";

export const handleDialogueMessageSend = async (setIsSending: any, action: any, onClose: any, toast: any, dialogueModalMessage: any, teachers: any, setTeachers?: any, router?: any) => {
    setIsSending(true);
    try {
        const { data } = await axios.post("/api/users/addRemoveTeach", {
            userId: action.teacher_id,
            action: action.type,
            // action: 'actionss',
            message: dialogueModalMessage,
        });
        setIsSending(false);

        setTeachers(
            teachers.filter((obj: any) => obj.userId !== action.teacher_id)
        );

        onClose();
        toast({
            title: data,
            status: "success",
            isClosable: true,
        });

        setTimeout(() => router.push(`/admin/view_teacher_applicants/`), 2000);
    } catch (err: any) {
        // console.log('erroo', err)
        setIsSending(false);
        toast({
            title:
                err?.response?.data?.message ||
                "Unable to send!. Please try again later",
            status: "error",
            isClosable: true,
        });
        // onClose();
    }
};

