import { createFileRoute } from "@tanstack/react-router";
import "../App.css";
import type { FormProps } from "antd";
import { Button, Space, Form, Input } from "antd";
import { Checkbox } from "antd";
import { useState, useEffect } from "react";
import type { CheckboxProps } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

export const Route = createFileRoute("/")({ component: App });

function App() {
  const [form] = Form.useForm();
  const [todos, setTodos] = useState<string[]>([]);

  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    storedTodos ? setTodos(JSON.parse(storedTodos)) : [];
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const onFinish: FormProps["onFinish"] = (values) => {
    setTodos((prev) => [...prev, values.todo]);
    form.resetFields();
  };

  const onChange: CheckboxProps["onChange"] = (e) => {
    console.log(`checked = ${e.target.checked}`);
  };

  function del(index: number) {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      const val = JSON.parse(storedTodos);
      console.log(val);
      val.splice(index, 1);
      console.log(val);
      localStorage.setItem("todos", JSON.stringify(val));
      setTodos(val);
    }
  }

  return (
    <div className="p-5 flex flex-col items-center bg-purple-200 h-screen gap-4">
      <Form form={form} className="flex gap-2" name="basic" onFinish={onFinish}>
        <Form.Item
          name="todo"
          rules={[{ required: true, message: "Please input your task!" }]}
        >
          <Input placeholder="Add a task..." />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>

      <Space direction="vertical">
        {todos.map((item, index) => (
          <div key={index} className={`bg-white px-4 py-2 rounded`}>
            <Checkbox onChange={onChange}>{item}</Checkbox>
            <DeleteOutlined className="pl-3" onClick={() => del(index)} />
          </div>
        ))}
      </Space>
    </div>
  );
}
